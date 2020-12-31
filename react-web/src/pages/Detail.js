import React from "react";

import DetailContainer from "../containers/DetailContainer";

function Detail({ match }) {
  window.scrollTo(0, 0);
  const { classRoomId } = match.params;

  return (
    <div>
      <DetailContainer classRoomId={classRoomId}></DetailContainer>
    </div>
  );
}

export default Detail;
