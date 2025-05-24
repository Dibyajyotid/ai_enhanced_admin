"use client";

export function DetailsPanel() {
  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium">Project Information</h3>
            <p className="text-sm text-muted-foreground mt-2">
              This is a demo details panel showing project information.
            </p>
          </div>

          <div className="p-4 border border-border rounded-lg">
            <h3 className="font-medium">Statistics</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div>
                <p className="text-sm">Total Messages</p>
                <p className="text-lg font-bold">128</p>
              </div>
              <div>
                <p className="text-sm">Active Users</p>
                <p className="text-lg font-bold">24</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
