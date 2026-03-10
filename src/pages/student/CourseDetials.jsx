import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { Loading } from "../../components/student/Loading";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import { Footer } from "../../components/student/Footer";
import YouTube from "react-youtube";

export const CourseDetials = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateNoOfLectures,
    calculateCourseDuration,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  }, [allCourses]);

  const toggleSection = (index) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return courseData ? (
    <>
      <div className="flex flex-col-reverse lg:flex-row gap-10 relative items-start justify-between max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-16 lg:pt-24">
        <div className="absolute top-0 left-0 w-full h-[300px] -z-0 bg-gradient-to-b from-red-100/70"></div>

        {/* LEFT SIDE */}

        <div className="w-full lg:max-w-2xl z-10 text-gray-500">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
            {courseData.courseTitle}
          </h1>

          <p
            className="pt-4 text-sm sm:text-base"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>

          {/* rating */}

          <div className="flex flex-wrap items-center gap-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>

            <p className="text-red-600">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"})
            </p>

            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>

          <p className="text-sm">
            Course by <span className="text-red-600 underline">Scientist</span>
          </p>

          {/* COURSE STRUCTURE */}

          <div className="pt-8 text-gray-800">
            <h2 className="text-xl font-semibold">Course Structure</h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-3 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transition-transform ${
                          openSections[index] ? "rotate-180" : ""
                        }`}
                        src={assets.down_arrow_icon}
                      />

                      <p className="font-medium text-sm sm:text-base">
                        {chapter.chapterTitle}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500">
                      {chapter.chapterContent.length} lectures
                    </p>
                  </div>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc pl-6 sm:pl-10 py-2 text-gray-600 border-t">
                      {chapter.chapterContent.map((lecture, i) => (
                        <li key={i} className="flex items-start gap-2 py-2">
                          <img
                            src={assets.play_icon}
                            className="w-4 h-4 mt-1"
                          />

                          <div className="flex items-center justify-between w-full text-xs sm:text-sm text-gray-800">
                            <p>{lecture.lectureTitle}</p>

                            <div className="flex gap-3 items-center">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-red-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}

                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] },
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="py-14 text-sm sm:text-base">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>

            <p
              className="pt-3 rich-text"
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
            ></p>
          </div>
        </div>

        {/* RIGHT SIDE CARD */}

        <div className="w-full max-w-md lg:max-w-[420px] mx-auto lg:mx-0 z-10 lg:sticky lg:top-24 shadow-lg rounded overflow-hidden bg-gray-200">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              className="w-full h-auto object-cover aspect-video"
            />
          )}

          <div className="p-5 bg-white">
            <div className="flex items-center gap-2">
              <img className="w-3.5" src={assets.time_left_clock_icon} />

              <p className="text-red-700 text-sm">
                <span className="font-medium">6 days</span> left at this price
              </p>
            </div>

            <div className="flex gap-3 items-center pt-3">
              <p className="text-gray-800 text-2xl lg:text-3xl font-semibold">
                {currency}{" "}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>

              <p className="text-gray-500 line-through text-sm">
                {currency} {courseData.coursePrice}
              </p>

              <p className="text-gray-500 text-sm">
                {courseData.discount}% off
              </p>
            </div>

            <div className="flex flex-wrap items-center text-sm gap-4 pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} />
                <p>{calculateRating(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-400"></div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>

              <div className="h-4 w-px bg-gray-400"></div>

              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} />
                <p>{calculateNoOfLectures(courseData)}</p>
              </div>
            </div>

            <button className="mt-6 w-full py-3 rounded bg-red-600 hover:bg-red-700 text-white font-medium">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="text-lg font-medium text-gray-800">
                What's in the Course?
              </p>

              <ul className="ml-4 pt-2 text-sm list-disc text-gray-500 space-y-1">
                <li>Full lifetime access</li>
                <li>Practical projects</li>
                <li>Downloadable resources</li>
                <li>Certificate of completion</li>
                <li>Free future updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  ) : (
    <Loading />
  );
};
