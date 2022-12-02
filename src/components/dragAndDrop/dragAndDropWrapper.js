import DragList from "./DragList";

function DragAndDropWrapper({meetingId, netId, isGroup}) {
  return <DragList isGroup={isGroup} meetingId={meetingId} netId={netId}  />;
}

export default DragAndDropWrapper;
