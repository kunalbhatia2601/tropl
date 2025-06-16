import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CreateJobModal } from "@/components/jobs/CreateJobModal";

export function JobsActions() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      <Button
        className="bg-blue-600 text-white hover:bg-blue-700"
        onClick={() => setShowCreateModal(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Create Job
      </Button>

      <CreateJobModal 
        open={showCreateModal} 
        onOpenChange={setShowCreateModal} 
      />
    </div>
  );
} 