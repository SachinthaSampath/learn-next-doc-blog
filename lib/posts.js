import fs from "fs";
import path from "path";
import matter from "gray-matter";


import { remark } from 'remark';
import html from 'remark-html';

//crate the path string
const postsDirectory = path.join(process.cwd(), "posts");

//this function will read the posts and sort them and return
export function getSortedPostsData() {

  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  //loop through file names
  const allPostsData = fileNames.map((fileName) => {

    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    //create full path for the md file with .md extension
    const fullPath = path.join(postsDirectory, fileName);

    // Read markdown file as string
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

}

//this function will return only the ids of posts
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },            
    };
  });

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
}


// export function getPostData(id) {
//   const fullPath = path.join(postsDirectory, `${id}.md`);
//   const fileContents = fs.readFileSync(fullPath, "utf8");

//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents);

//   // Combine the data with the id
//   return {
//     id,
//     ...matterResult.data,
//   };
// }


//this method will return the post matching for the given id
export async function getPostData(id) {

  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  // console.log("result",matterResult);
  
  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}