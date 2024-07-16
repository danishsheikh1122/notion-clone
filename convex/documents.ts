import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { error } from "console";
import { Children, useId } from "react";
import { chdir } from "process";

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("document")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;
    const document = await ctx.db.insert("document", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublisher: false,
    });
  },
});

// export const get = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("not authenticated");
//     const documents = await ctx.db.query("document").collect();
//     return documents;
//   },
// });

//for recursively calling doc folder structure
export const getSideBar = query({
  args: {
    parentDocument: v.optional(v.id("document")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;
    const doc = await ctx.db
      .query("document")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return doc;
  },
});

export const archive = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;
    const existingDoc = await ctx.db.get(args.id);
    if (!existingDoc) {
      throw new Error("not found");
    }
    if (existingDoc.userId !== userId) {
      throw new Error("not authorized");
    }

    const recursiveFunction = async (documentId: Id<"document">) => {
      const children = await ctx.db
        .query("document")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        await recursiveFunction(child._id);
      }
    };

    const doc = await ctx.db.patch(args.id, {
      isArchived: true,
    });
    recursiveFunction(args.id);
    return doc;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;
    const documents = await ctx.db
      .query("document")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  },
});

export const restoreTrash = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;

    const doc = await ctx.db.get(args.id);
    if (!doc) throw new Error("not found");

    if (doc.userId !== userId) throw new Error("not authorized");

    const recursiveRestore = async (documentId: Id<"document">) => {
      const children = await ctx.db
        .query("document")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });
        await recursiveRestore(child._id);
      }
    };

    const option: Partial<Doc<"document">> = {
      isArchived: false,
    };
    if (doc.parentDocument) {
      const parent = await ctx.db.get(doc.parentDocument);
      if (parent?.isArchived) {
        option.parentDocument = undefined;
      }
    }
    await ctx.db.patch(args.id, option);
    recursiveRestore(args.id);
    return doc;
  },
});

export const deletePermanently = mutation({
  args: { id: v.id("document") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("not authenticated");
    const userId = identity.subject;

    const doc = await ctx.db.get(args.id);
    if (!doc) throw new Error("not found");
    if (doc.userId !== userId) throw new Error("not authorized");

    const document = await ctx.db.delete(args.id);
    return document;
  },
});
