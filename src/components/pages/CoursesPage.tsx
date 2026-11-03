import React, { useState } from 'react';
import { Course } from '../../types';

interface CoursesPageProps {
  courses: Course[];
  onEnroll: (course: Course) => void;
  onShowToast: (msg: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({
  courses,
  onEnroll,
  onShowToast,
}) => {
  const [filter, setFilter] = useState<'all' | 'enrolled'>('all');

  const displayedCourses = filter === 'enrolled' 
    ? courses.filter((c) => c.enrolled)
    : courses;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-syne font-extrabold text-2xl sm:text-3xl text-white mb-2">
            My Courses &amp; Programs
          </h2>
          <p className="text-[#8892B0] text-sm sm:text-base">
            Track your enrolled programs, continue modular lessons, or discover top certifications.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] text-white shadow-xs'
                : 'text-[#8892B0] hover:text-white'
            }`}
          >
            All Courses ({courses.length})
          </button>
          <button
            onClick={() => setFilter('enrolled')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              filter === 'enrolled'
                ? 'bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] text-white shadow-xs'
                : 'text-[#8892B0] hover:text-white'
            }`}
          >
            Enrolled ({courses.filter((c) => c.enrolled).length})
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#7C3AED]/50 transition-all duration-300 flex flex-col justify-between"
          >
            <div
              className="h-36 flex items-center justify-center text-5xl relative shadow-inner"
              style={{ background: course.thumbGradient }}
            >
              <span>{course.thumbIcon}</span>
              {course.enrolled && (
                <span className="absolute top-3 right-3 text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#10B981] text-white shadow-md">
                  Active
                </span>
              )}
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="inline-block bg-[#FF6B00]/15 text-[#FF6B00] text-xs font-bold px-2.5 py-1 rounded-full mb-3">
                  {course.tag}
                </span>
                <h3 className="font-syne font-bold text-base text-white mb-2">
                  {course.title}
                </h3>
                <p className="text-xs text-[#8892B0] leading-relaxed mb-4">
                  {course.desc}
                </p>

                {course.enrolled && (
                  <div className="mt-2 mb-4">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="text-[#8892B0]">Progress</span>
                      <span className="font-semibold text-white">{course.progress || 0}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#7C3AED] to-[#FF6B00] transition-all duration-1000"
                        style={{ width: `${course.progress || 0}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {!course.enrolled && (
                  <span className="font-syne font-extrabold text-lg text-[#FF6B00]">
                    {course.price}
                  </span>
                )}
                <button
                  onClick={() => {
                    if (course.enrolled) {
                      onShowToast(`Resuming "${course.title}"...`);
                    } else {
                      onEnroll(course);
                    }
                  }}
                  className={`py-2 px-4 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    course.enrolled
                      ? 'w-full bg-gradient-to-r from-[#7C3AED] to-[#FF8C35] text-white hover:opacity-90 shadow-md'
                      : 'bg-[#FF6B00] text-white hover:bg-[#FF8C35] shadow-md ml-auto'
                  }`}
                >
                  {course.enrolled ? 'Continue Course →' : 'Enroll Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
