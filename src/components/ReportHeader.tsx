import { BadgeCheck, Clock, Scale, Shield } from 'lucide-react';

type Props = {
  id: number;
  created_at: string;
};

export const ReportHeader = ({ id, created_at }: Props) => (
  <div className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-6 md:py-8 border-b border-blue-700">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="bg-white p-2 rounded-lg">
            <Shield className="w-6 md:w-8 h-6 md:h-8 text-blue-900" />
          </div>
          <div className="flex-1 md:flex-auto">
            <h1 className="text-xl md:text-3xl font-bold leading-tight">
              Official National mover bureauReport
            </h1>
            <p className="text-sm md:text-base text-blue-200">
              National mover bureau Verification System
            </p>
          </div>
        </div>
        <div className="w-full md:w-auto">
          <div className="text-sm text-blue-200">Report ID</div>
          <div className="font-mono bg-blue-800 px-4 py-2 rounded-lg text-sm md:text-base w-full md:w-auto text-center md:text-left">
            {id}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-blue-200">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span className="whitespace-nowrap">
              Generated on {created_at.slice(0, 10)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4" />
            <span>Official Record</span>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          <Scale className="w-4 h-4" />
          <span className="text-center md:text-left">
            Data verified by multiple sources
          </span>
        </div>
      </div>
    </div>
  </div>
);
