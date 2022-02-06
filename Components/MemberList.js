import MembersListElement from "./MemberListElement";

const MemberList = ({ members, tableID }) => {

    return (<ul className="w-full">
        {members.map((val, idx) => <MembersListElement firstname={val.firstname} lastname={val.lastname} classID={val.classID} key={val.ID} ID={val.ID} tableID={tableID} />)}
    </ul>);
}

export default MemberList;