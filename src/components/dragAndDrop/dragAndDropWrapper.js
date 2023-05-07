import DragList from "./DragList";

function DragAndDropWrapper({ meetingId, netId, isGroup, setSendDataBool }) {
  return <DragList isGroup={isGroup} meetingId={meetingId} netId={netId} setSendDataBool={setSendDataBool} />;
}

export default DragAndDropWrapper;
