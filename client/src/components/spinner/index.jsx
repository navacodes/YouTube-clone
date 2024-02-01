import React from "react";

const Spinner = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className="yt-spinner" data-layer="4">
        <div>
          <div className="yt-spinner-container">
            <div className="yt-spinner-rotator">
              <div className="yt-spinner-left">
                <div className="yt-spinner-circle"></div>
              </div>
              <div className="yt-spinner-right">
                <div className="yt-spinner-circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
