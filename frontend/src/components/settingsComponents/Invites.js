import React, { useEffect, useState } from 'react'
import axios from 'axios';
import styled from 'styled-components';

const Invites = ({ error, setError, groupId, fetchMembers }) => {
  const [isLoading, setLoading] = useState(false);
  const [invites, setInvites] = useState([]);
  const [invitesEmpty, setInvitesEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:3001/groups/${groupId}/invites/`, { withCredentials: true })
      .then((res) => {
        setInvites(res.data.invites);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError({ message: error.response?.data?.error || error.message })
        setInvitesEmpty(true);
      });
  }, [groupId]);

  const handleAcceptInvite = (groupId, userId, inviteid) => {
    const data = {
      groupId: groupId,
      userId: userId,
      inviteId: inviteid
    }
    console.log(data);
    axios.post(`http://localhost:3001/groups/addmembers`, data, { withCredentials: true })
      .then((res) => {
        axios.get(`http://localhost:3001/groups/${groupId}/invites/`, { withCredentials: true })
          .then((res) => {
            setInvites(res.data.invites);
            fetchMembers();
          })
          .catch((error) => {
            setInvites([]);
            setInvitesEmpty(true);
            fetchMembers();
          });
      })
      .catch((error) => {
        setError({ statusCode: error.response?.status, message: error.response.data.error || error.message })
      });
  };

  return (
    <>
      {!error && invitesEmpty && <Header>No invites</Header>}
      {!isLoading && invites.map((invite) => {
        return (
          <Invite key={invite.inviteid}>
            <AvatarContainer>
              <MemberAvatar src={invite.avatar} alt="Member avatar" />
              <Header key={invite.userid}>{invite.username}</Header>
            </AvatarContainer>
            <AcceptButton onClick={() => handleAcceptInvite(groupId, invite.userid, invite.inviteid)}>+</AcceptButton>
          </Invite>
        );
      })}
    </>
  )
}

const Invite = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const MemberAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: left;
  justify-content: left;
  margin-top: 1rem;
  margin-bottom: 2rem;
`;

const Header = styled.h4`
  font-size: 1.25rem;
  padding: 1rem;
  margin: 0;
  font-family: Montserrat;
  color: #F3F3E7;
`;

const AcceptButton = styled.button`
  background-color: #2A2A2A;
  color: #F3F3E7;
  border: none;
  border-radius: 50px;
  font-size: 1.25rem;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: 1rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;
export default Invites