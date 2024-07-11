// const { execSync } = require('child_process');

// // Function to commit changes with a specific date
// function commitOnSpecificDay(message, date) {
//   try {
//     // Format the date for Git commit in ISO 8601 format
//     const formattedDate = new Date(date).toISOString();

//     // Git commands to commit with specific date
//     console.log(formattedDate)
//     execSync(`git add -A`);
//     execSync(`GIT_COMMITTER_DATE="${formattedDate}" git commit --date="${formattedDate}" -m "${message}"`);

//     console.log(`Committed with message: "${message}" and date: ${formattedDate}`);
//   } catch (error) {
//     console.error('Error occurred:', error);
//   }
// }

// // Example usage: Commit with specific message and date
// const commitMessage = 'Committing changes on April 27, 2024';
// const commitDate = '2024-04-27T12:00:00Z'; // Specific date and time in ISO 8601 format

// commitOnSpecificDay(commitMessage, commitDate);


const { execSync } = require('child_process');

// Function to generate commits for all dates in previous month
function generateCommitsForPreviousMonth() {
  try {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // Note: January is 0, December is 11

    // Calculate previous month's year and month
    const prevMonthYear = month === 0 ? year - 1 : year;
    const prevMonth = month === 0 ? 11 : month - 1;

    // Get the number of days in the previous month
    const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate();

    // Loop through each day of the previous month and create a commit
    for (let day = 1; day <= daysInPrevMonth; day++) {
      const date = new Date(prevMonthYear, prevMonth, day).toISOString();
      const formattedDate = date.slice(0, 10); // Extract YYYY-MM-DD part

      // Git commands to commit on each date
      execSync(`GIT_COMMITTER_DATE="${date}" git commit --date="${date}" --allow-empty -m "Commit for ${formattedDate}"`);
    }

    console.log(`Generated commits for all dates in the previous month.`);
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

// Run the function to generate commits for previous month
generateCommitsForPreviousMonth();