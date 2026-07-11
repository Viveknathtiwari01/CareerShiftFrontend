import { Clock, BookOpen, Infinity, Award, Users } from "lucide-react";

const details = [
  { icon: Clock, label: "Duration", value: "6 Hours" },
  { icon: BookOpen, label: "Level", value: "Beginner" },
  { icon: Infinity, label: "Access", value: "Lifetime" },
  { icon: Award, label: "Certificate", value: "Included" },
  { icon: Users, label: "Community", value: "Included" },
];

export function WorkshopOverview() {
  return (
    <div className="py-6 border-y border-border my-6">
      <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
        <div className="md:w-1/3">
          <h2 className="text-xl font-bold text-foreground">
            Master AI for Everyday Professionals
          </h2>
          <p className="mt-2 text-muted-foreground text-sm">
            A comprehensive, self-paced workshop designed for non-technical professionals.
          </p>
        </div>
        
        <div className="md:w-2/3 grid grid-cols-2 sm:grid-cols-5 gap-4 w-full">
          {details.map((detail) => (
            <div 
              key={detail.label}
              className="flex flex-col items-start"
            >
              <detail.icon className="h-4 w-4 text-primary mb-2" />
              <p className="text-xs font-medium text-muted-foreground">{detail.label}</p>
              <p className="font-semibold text-foreground text-sm">{detail.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
