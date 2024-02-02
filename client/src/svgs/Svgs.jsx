export const CreateIcon = ({ fill = "none", size = 40, stroke = "white" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Group 4">
        <path
          id="Vector 78"
          d="M17.2041 16.0221V24.7797M11.9231 20.5C16.0478 20.5 18.3604 20.5 22.4852 20.5M8 12V29H26.4837V22.5012L32.8462 23.1154V15.2692L26.4837 16.0221V12C19.2654 12 15.2183 12 8 12Z"
          stroke={stroke}
          stroke-width="1.2"
        />
      </g>
    </svg>
  );
};

export const HelpIcon = ({ size = 20, fill = "white" }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Vector">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1ZM0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10Z"
          fill={fill}
        />
        <path d="M11 15C11 15.5523 10.5523 16 10 16C9.44772 16 9 15.5523 9 15C9 14.4477 9.44772 14 10 14C10.5523 14 11 14.4477 11 15Z" fill={fill} />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 6.25C9.17157 6.25 8.5 6.92157 8.5 7.75V8H6.5V7.75C6.5 5.817 8.067 4.25 10 4.25C11.933 4.25 13.5 5.817 13.5 7.75V7.99264C13.5 8.74279 13.202 9.46221 12.6716 9.99264L11 11.6642V12.25H9V11.25C9 10.9848 9.10536 10.7304 9.29289 10.5429L11.2574 8.57843C11.4127 8.42307 11.5 8.21235 11.5 7.99264V7.75C11.5 6.92157 10.8284 6.25 10 6.25Z"
          fill={fill}
        />
      </g>
    </svg>
  );
};
