import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CourseCard = ({ course }) => (
  <div
    key={course._id}
    className="group relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all"
  >
    <Link to={`/courses/${course._id}`}>
      <img
        src={course.thumbnail}
        alt={course.name}
        width={400}
        height={225}
        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
      />
      <div className="p-4 bg-background">
        <h3 className="text-lg font-semibold tracking-tight line-clamp-2">
          {course.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {course.description}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {course.instructor}
          </span>
          <h2 className="ml-20">
            Likes:
            {course.likes || 0}
          </h2>
        </div>
      </div>
    </Link>
  </div>
);

export default CourseCard;
