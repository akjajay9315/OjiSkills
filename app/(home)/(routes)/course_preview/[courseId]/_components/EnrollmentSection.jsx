import { EnrollCourse, PublishCourse } from "@/app/_services";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React from "react";

function EnrollmentSection({ courseDetail, userCourse }) {
  const router = useRouter();
  const { user } = useUser();

  const enrollCourse = async () => {
    if (user) {
      await EnrollCourse(
        courseDetail.id,
        user.primaryEmailAddress.emailAddress
      ).then(async (resp) => {
        console.log("EnrollCourseResp=>", resp);
        if (resp) {
          await PublishCourse(resp?.createUserEnrollCourse?.id).then(
            (result) => {
              console.log(result);
              if(result){
                router.push('/view-course/'+courseDetail.id)
              }
            }
          );
        }
      });
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <div>
      {userCourse?.courseId ? (
        <div className="mt-5 border-2 rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Learn in a planned way on a single platform, as planning well is
            wiser.
          </h2>
          <button
            className="p-2 w-full bg-green-500 
          text-white rounded-lg text-[14px] mt-2
           hover:bg-green-600"
            onClick={() => router.push("/view-course/" + courseDetail.id)}
          >
            Continue Learning
          </button>
        </div>
      ) : null}

      {courseDetail.free && !userCourse?.courseId ? (
        <div className="mt-5 border-2 rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Learn in a planned way on a single platform, as planning well is
            wiser.
          </h2>
          <button
            className="p-2 w-full bg-green-500 text-white rounded-lg text-[14px] mt-2 hover:bg-green-600"
            onClick={enrollCourse}
          >
            Enroll now
          </button>
        </div>
      ) : null}

      {!courseDetail.free && !userCourse?.courseId ? (
        <div className="mt-5 border-2 rounded-lg p-2 text-center">
          <h2 className="text-gray-500">
            Buy this course, build your skill and track the progress.
          </h2>
          <button className="p-2 w-full bg-green-500 text-white rounded-lg text-[14px] mt-2 hover:bg-green-600">
            Buy course for $2
          </button>
        </div>
      ) : null}

      <div className="mt-5 border-2 rounded-lg p-2 text-center">
        <h2 className="text-gray-500">
          Buy monthly membership and get access to premium features like contest
          info and unlimited blog access.
        </h2>
        <button className="p-2 w-full bg-green-500 text-white rounded-lg text-[14px] mt-2 hover:bg-green-600">
          Buy Membership $3.99/Month
        </button>
      </div>
    </div>
  );
}

export default EnrollmentSection;
