import { gql, request } from "graphql-request"

const MASTER_URL =
  "https://api-ap-south-1.hygraph.com/v2/" +
  process.env.NEXT_PUBLIC_HYGRAPH_KEY +
  "/master";

export const getCourseList = async() => {
  const query = gql`
    query courseList {
      courseLists {
        name
        banner {
          url
        }
        publishedBy {
          name
        }
        free
        id
        totalChapters
        tags
        author
      }
    }
  `;
  const result = await request(MASTER_URL,query);
  return result;
}

export const getCourseById = async(id,userEmail)=>{
  const query =
    gql`
    query course {
      courseList(where: { id: "` +
    id +
    `" }) {
        chapters {
          ... on Chapter {
            id
            name
            youtubeUrl
          }
        }
        discription
        name
        author
        id
        free
        totalChapters
      }
    userEnrollCourses(where: {courseId: "` +
    id +
    `",
    userEmail: "` +
    userEmail +
    `"}) {
    courseId
    userEmail
    completedChapter
  }
    }
  `;
  const result = await request(MASTER_URL,query);
  return result;
}

export const EnrollCourse=async(courseId, userEmail)=>{
  const mutationQuery = gql`
    mutation EnrollCourse {
      createUserEnrollCourse(data: { userEmail: "`+userEmail+`", courseId: "`+courseId+`" }) {
        id
      } 
    }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const PublishCourse = async(id)=>{
  const mutationQuery = gql`
    mutation EnrollCourse {
      publishUserEnrollCourse(where: { id: "`+id+`" })
      {
        id
      }
    }
  `
  const result = await request(MASTER_URL, mutationQuery);
  return result;
}

export const GetUserCourseList=async(userEmail)=>{
  const query = gql`
    query UserCourseList {
      userEnrollCourses(where: { userEmail: "`+userEmail+`" }) {
        courseList {
          banner {
            url
          }
          name  
          discription
          id
          free
          tags
          totalChapters
          author
        }
      }
    }
  `
  const result = await request(MASTER_URL, query);
  return result;
}