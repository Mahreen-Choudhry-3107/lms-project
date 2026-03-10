import React, { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

export const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);

  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);

  const [lectureDetials, setLectureDetials] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  // CHAPTER FUNCTIONS
  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter Chapter Name:");

      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false,
        };

        setChapters((prev) => [...prev, newChapter]);
      }
    } else if (action === "remove") {
      setChapters((prev) => prev.filter((ch) => ch.chapterId !== chapterId));
    } else if (action === "toggle") {
      setChapters((prev) =>
        prev.map((ch) =>
          ch.chapterId === chapterId ? { ...ch, collapsed: !ch.collapsed } : ch,
        ),
      );
    }
  };

  // LECTURE FUNCTIONS
  const handleLecture = (action, chapterId, lectureIndex) => {
    if (action === "add") {
      setCurrentChapterId(chapterId);
      setShowPopup(true);
    } else if (action === "remove") {
      setChapters((prev) =>
        prev.map((ch) => {
          if (ch.chapterId === chapterId) {
            return {
              ...ch,
              chapterContent: ch.chapterContent.filter(
                (_, i) => i !== lectureIndex,
              ),
            };
          }
          return ch;
        }),
      );
    }
  };

  // ADD LECTURE
  const addLecture = () => {
    if (!lectureDetials.lectureTitle) return;

    setChapters((prev) =>
      prev.map((ch) => {
        if (ch.chapterId === currentChapterId) {
          return {
            ...ch,
            chapterContent: [
              ...ch.chapterContent,
              {
                lectureId: uniqid(),
                ...lectureDetials,
              },
            ],
          };
        }

        return ch;
      }),
    );

    setLectureDetials({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });

    setShowPopup(false);
  };

  // SUBMIT COURSE
  const handleSubmit = (e) => {
    e.preventDefault();

    const courseData = {
      courseTitle,
      coursePrice,
      discount,
      image,
      description: quillRef.current.root.innerHTML,
      chapters,
    };

    console.log("COURSE DATA:", courseData);

    // yaha API call kar sakte ho
    alert("Course Added Successfully 🚀");
  };

  // QUILL
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="w-full flex justify-center p-4 md:p-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl flex flex-col gap-6"
      >
        {/* TITLE */}

        <div className="flex flex-col gap-1">
          <p className="font-medium">Course Title</p>
          <input
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            type="text"
            placeholder="Type here"
            className="outline-none py-2.5 px-3 rounded border border-gray-400 w-full"
          />
        </div>

        {/* DESCRIPTION */}

        <div className="flex flex-col gap-1">
          <p className="font-medium">Course Description</p>
          <div
            ref={editorRef}
            className="bg-white border rounded min-h-[150px]"
          ></div>
        </div>

        {/* PRICE + IMAGE */}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <p className="font-medium">Course Price</p>
            <input
              type="number"
              value={coursePrice}
              onChange={(e) => setCoursePrice(e.target.value)}
              className="outline-none py-2.5 px-3 rounded border border-gray-400 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium">Course Thumbnail</p>

            <label
              htmlFor="thumbnailImage"
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={assets.file_upload_icon}
                className="p-3 bg-red-500 rounded"
              />

              <input
                type="file"
                id="thumbnailImage"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  className="h-12 rounded"
                />
              )}
            </label>
          </div>
        </div>

        {/* DISCOUNT */}

        <div className="flex flex-col gap-1">
          <p className="font-medium">Discount %</p>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="outline-none py-2.5 px-3 rounded border border-gray-400 w-40"
          />
        </div>

        {/* CHAPTERS */}

        <div>
          {chapters.map((chapter, index) => (
            <div
              key={chapter.chapterId}
              className="bg-white border rounded-lg mb-4 shadow-sm"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    onClick={() => handleChapter("toggle", chapter.chapterId)}
                    className={`cursor-pointer transition ${chapter.collapsed && "-rotate-90"}`}
                  />

                  <span className="font-semibold">
                    {index + 1}. {chapter.chapterTitle}
                  </span>
                </div>

                <img
                  src={assets.cross_icon}
                  onClick={() => handleChapter("remove", chapter.chapterId)}
                  className="cursor-pointer w-4"
                />
              </div>

              {!chapter.collapsed && (
                <div className="p-4">
                  {chapter.chapterContent.map((lecture, i) => (
                    <div
                      key={lecture.lectureId}
                      className="flex justify-between mb-2 text-sm"
                    >
                      <span>
                        {i + 1}. {lecture.lectureTitle}
                      </span>

                      <img
                        src={assets.cross_icon}
                        onClick={() =>
                          handleLecture("remove", chapter.chapterId, i)
                        }
                        className="w-4 cursor-pointer"
                      />
                    </div>
                  ))}

                  <div
                    className="inline-flex bg-gray-100 px-3 py-1.5 rounded cursor-pointer mt-2 text-sm hover:bg-gray-200"
                    onClick={() => handleLecture("add", chapter.chapterId)}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          <div
            className="flex justify-center items-center bg-red-100 hover:bg-red-200 transition p-2 rounded-lg cursor-pointer"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>
        </div>

        {/* BUTTON */}

        <button
          type="submit"
          className="bg-black hover:bg-gray-800 transition text-white py-2.5 px-6 rounded w-full md:w-fit"
        >
          ADD COURSE
        </button>
      </form>

      {/* POPUP */}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white p-6 rounded w-full max-w-sm flex flex-col gap-3">
            <p className="font-semibold">Add Lecture</p>

            <input
              type="text"
              placeholder="Lecture Title"
              value={lectureDetials.lectureTitle}
              onChange={(e) =>
                setLectureDetials({
                  ...lectureDetials,
                  lectureTitle: e.target.value,
                })
              }
              className="border px-2 py-1 rounded"
            />

            <input
              type="number"
              placeholder="Duration"
              value={lectureDetials.lectureDuration}
              onChange={(e) =>
                setLectureDetials({
                  ...lectureDetials,
                  lectureDuration: e.target.value,
                })
              }
              className="border px-2 py-1 rounded"
            />

            <input
              type="text"
              placeholder="Lecture URL"
              value={lectureDetials.lectureUrl}
              onChange={(e) =>
                setLectureDetials({
                  ...lectureDetials,
                  lectureUrl: e.target.value,
                })
              }
              className="border px-2 py-1 rounded"
            />

            <label className="flex gap-2 text-sm">
              <input
                type="checkbox"
                checked={lectureDetials.isPreviewFree}
                onChange={(e) =>
                  setLectureDetials({
                    ...lectureDetials,
                    isPreviewFree: e.target.checked,
                  })
                }
              />
              Free Preview
            </label>

            <button
              type="button"
              onClick={addLecture}
              className="bg-red-500 hover:bg-red-600 text-white py-1 rounded"
            >
              Add Lecture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
