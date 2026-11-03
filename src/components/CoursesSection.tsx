import React from 'react';
import { Course } from '../types';

interface CoursesSectionProps {
  courses: Course[];
  onEnroll: (course: Course) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({ courses, onEnroll }) => {
  return (
    <section id="courses" className="py-24 px-6 lg:px-16 bg-white text-[#1A1F3C]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <span className="text-[#FF6B00] font-bold text-xs uppercase tracking-widest block mb-3">
            Popular Courses
          </span>
          <h2 className="font-syne text-3xl sm:text-4xl font-extrabold text-[#1A1F3C] mb-4">
            Top-Rated Programs
          </h2>
          <p className="text-[#8892B0] text-base leading-relaxed max-w-xl">
            Carefully crafted programs aligned with industry demand and future job markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="rounded-2xl overflow-hidden border border-[#E8EAF2] bg-white hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(26,31,60,0.1)] transition-all duration-300 flex flex-col"
            >
              <div 
                className="h-40 flex items-center justify-center text-5xl relative"
                style={{ background: course.thumbGradient }}
              >
                <span>{course.thumbIcon}</span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-block bg-[#FF6B00]/10 text-[#FF6B00] text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {course.tag}
                  </span>
                  <h3 className="font-syne font-bold text-lg text-[#1A1F3C] mb-2">
                    {course.title}
                  </h3>
                  <p className="text-[#8892B0] text-sm leading-relaxed mb-4">
                    {course.desc}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-[#E8EAF2]">
                  <span className="font-syne font-extrabold text-xl text-[#FF6B00]">
                    {course.price}
                  </span>
                  <button
                    onClick={() => onEnroll(course)}
                    className="bg-[#1A1F3C] text-white hover:bg-[#FF6B00] px-5 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
