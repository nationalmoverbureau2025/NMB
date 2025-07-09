export const ReportProgress = ({width}: {width: string}) => (
    <div className="bg-blue-50 p-6 rounded-lg grow">
              <span className="text-blue-800 ">
                Report processing usually takes around 10 minutes
              </span>
              <div className="w-full">
                <div className="flex items-center justify-between mb-2"></div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-blue-400 transition-all duration-500`}
                    style={{
                      width,
                    }}
                  />
                </div>
              </div>
            </div>
)