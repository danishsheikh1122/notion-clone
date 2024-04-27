const { execSync } = require('child_process');

// Function to commit changes with a specific date
function commitOnSpecificDay(message, date) {
  try {
    // Format the date for Git commit in ISO 8601 format
    const formattedDate = new Date(date).toISOString();

    // Git commands to commit with specific date
    execSync(`git add -A`);
    execSync(`GIT_COMMITTER_DATE="${formattedDate}" git commit --date="${formattedDate}" -m "${message}"`);

    console.log(`Committed with message: "${message}" and date: ${formattedDate}`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Example usage: Commit with specific message and date
const commitMessage = 'Committing changes on April 27, 2024';
const commitDate = '2024-04-27T12:00:00Z'; // Specific date and time in ISO 8601 format

commitOnSpecificDay(commitMessage, commitDate);
