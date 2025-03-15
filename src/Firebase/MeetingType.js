
export const MeetingJoinType = "anyone-can-join" | "video-conference" | "1-on-1"



const MeetingType = {
    docId: '',
    createdBy: '',
    invitedUsers: [],
    maxUsers: 0,
    meetingDate: '',
    meetingId: '',
    meetingName: '',
    meetingType: MeetingJoinType,
    status: boolean
};

export default MeetingType;