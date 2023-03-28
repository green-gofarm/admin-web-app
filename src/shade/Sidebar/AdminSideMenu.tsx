const MENUITEMS = [
  {
    menutitle: "Báo cáo",
    Items: [
      {
        title: "Tổng quan",
        path: "/dashboard/overview",
        type: "link",
        active: false,
        selected: false,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM9 9H5V5h4v4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zm-1 6h-4V5h4v4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1zm-1 6H5v-4h4v4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4zm0 6c-1.103 0-2-.897-2-2s.897-2 2-2 2 .897 2 2-.897 2-2 2z" />
          </svg>
        ),
      },
    ],
  },

  {
    menutitle: "Quản lý",
    Items: [
      {
        title: "Tài khoản",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            height="24"
            version="1.1"
            width="24"
            viewBox="0 0 24 24"
          >
            <path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M7.07,18.28C7.5,17.38 10.12,16.5 12,16.5C13.88,16.5 16.5,17.38 16.93,18.28C15.57,19.36 13.86,20 12,20C10.14,20 8.43,19.36 7.07,18.28M18.36,16.83C16.93,15.09 13.46,14.5 12,14.5C10.54,14.5 7.07,15.09 5.64,16.83C4.62,15.5 4,13.82 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,13.82 19.38,15.5 18.36,16.83M12,6C10.06,6 8.5,7.56 8.5,9.5C8.5,11.44 10.06,13 12,13C13.94,13 15.5,11.44 15.5,9.5C15.5,7.56 13.94,6 12,6M12,11C11.17,11 10.5,10.33 10.5,9.5C10.5,8.67 11.17,8 12,8C12.83,8 13.5,8.67 13.5,9.5C13.5,10.33 12.83,11 12,11Z" />
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: "/management/account/host",
            type: "link",
            active: false,
            selected: false,
            title: "Chủ farmstay",
          },
          {
            path: "/management/account/customer",
            type: "link",
            active: false,
            selected: false,
            title: "Khách du lịch",
          },
        ],
      },
      {
        path: "/management/farmstay",
        title: "Farmstay",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: "/management/farmstay/preview",
            type: "link",
            active: false,
            selected: false,
            title: "Phê duyệt farmstays",
          },
          {
            path: "/management/farmstay/all",
            type: "link",
            active: false,
            selected: false,
            title: "Danh sách farmstays",
          },
        ],
      },
      {
        path: "/management/order",
        title: "Đơn hàng",
        type: "link",
        active: false,
        selected: false,
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            className="side-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M300 462.4h424.8v48H300v-48zM300 673.6H560v48H300v-48z" fill="" />
            <path
              d="M818.4 981.6H205.6c-12.8 0-24.8-2.4-36.8-7.2-11.2-4.8-21.6-11.2-29.6-20-8.8-8.8-15.2-18.4-20-29.6-4.8-12-7.2-24-7.2-36.8V250.4c0-12.8 2.4-24.8 7.2-36.8 4.8-11.2 11.2-21.6 20-29.6 8.8-8.8 18.4-15.2 29.6-20 12-4.8 24-7.2 36.8-7.2h92.8v47.2H205.6c-25.6 0-47.2 20.8-47.2 47.2v637.6c0 25.6 20.8 47.2 47.2 47.2h612c25.6 0 47.2-20.8 47.2-47.2V250.4c0-25.6-20.8-47.2-47.2-47.2H725.6v-47.2h92.8c12.8 0 24.8 2.4 36.8 7.2 11.2 4.8 21.6 11.2 29.6 20 8.8 8.8 15.2 18.4 20 29.6 4.8 12 7.2 24 7.2 36.8v637.6c0 12.8-2.4 24.8-7.2 36.8-4.8 11.2-11.2 21.6-20 29.6-8.8 8.8-18.4 15.2-29.6 20-12 5.6-24 8-36.8 8z"
              fill="" />
            <path
              d="M747.2 297.6H276.8V144c0-32.8 26.4-59.2 59.2-59.2h60.8c21.6-43.2 66.4-71.2 116-71.2 49.6 0 94.4 28 116 71.2h60.8c32.8 0 59.2 26.4 59.2 59.2l-1.6 153.6z m-423.2-47.2h376.8V144c0-6.4-5.6-12-12-12H595.2l-5.6-16c-11.2-32.8-42.4-55.2-77.6-55.2-35.2 0-66.4 22.4-77.6 55.2l-5.6 16H335.2c-6.4 0-12 5.6-12 12v106.4z"
              fill="" />
          </svg>
        ),
      },
      {
        path: "/management/withdrawal-request",
        title: "Đơn hàng giải ngân",
        type: "link",
        active: false,
        selected: false,
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 1024 1024"
            className="side-menu__icon"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M952.32 839.68c16.962 0 30.72-13.758 30.72-30.72V215.04c0-16.962-13.758-30.72-30.72-30.72H71.68c-16.962 0-30.72 13.758-30.72 30.72v593.92c0 16.962 13.758 30.72 30.72 30.72h880.64zm0 40.96H71.68C32.097 880.64 0 848.543 0 808.96V215.04c0-39.583 32.097-71.68 71.68-71.68h880.64c39.583 0 71.68 32.097 71.68 71.68v593.92c0 39.583-32.097 71.68-71.68 71.68z" />
            <path
              d="M23.48 308.068h980.04v-40.96H23.48zm335.028 150.947h249.856c70.128 0 126.976 56.848 126.976 126.976v4.096c0 70.128-56.848 126.976-126.976 126.976H313.452c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48h294.912c92.75 0 167.936-75.186 167.936-167.936v-4.096c0-92.75-75.186-167.936-167.936-167.936H358.508c-11.311 0-20.48 9.169-20.48 20.48s9.169 20.48 20.48 20.48z" />
            <path
              d="M374.948 351.422l-70.963 70.963c-7.998 7.998-7.998 20.965 0 28.963s20.965 7.998 28.963 0l70.963-70.963c7.998-7.998 7.998-20.965 0-28.963s-20.965-7.998-28.963 0z" />
            <path
              d="M402.173 495.369l-70.963-70.963c-7.998-7.998-20.965-7.998-28.963 0s-7.998 20.965 0 28.963l70.963 70.963c7.998 7.998 20.965 7.998 28.963 0s7.998-20.965 0-28.963z" />
          </svg>
        ),
      },
      {
        path: "/management/feedback",
        title: "Feedback",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.32698 6.63803L5.21799 7.09202L4.32698 6.63803ZM4.7682 20.2318L4.06109 19.5247H4.06109L4.7682 20.2318ZM18.362 16.673L18.816 17.564L18.816 17.564L18.362 16.673ZM19.673 15.362L20.564 15.816L20.564 15.816L19.673 15.362ZM19.673 6.63803L20.564 6.18404L20.564 6.18404L19.673 6.63803ZM18.362 5.32698L18.816 4.43597L18.816 4.43597L18.362 5.32698ZM5.63803 5.32698L6.09202 6.21799L5.63803 5.32698ZM7.70711 17.2929L7 16.5858L7.70711 17.2929ZM5 9.8C5 8.94342 5.00078 8.36113 5.03755 7.91104C5.07337 7.47262 5.1383 7.24842 5.21799 7.09202L3.43597 6.18404C3.18868 6.66937 3.09012 7.18608 3.04419 7.74817C2.99922 8.2986 3 8.97642 3 9.8H5ZM5 12V9.8H3V12H5ZM3 12V17H5V12H3ZM3 17V19.9136H5V17H3ZM3 19.9136C3 21.2054 4.56185 21.8524 5.4753 20.9389L4.06109 19.5247C4.40757 19.1782 5 19.4236 5 19.9136H3ZM5.4753 20.9389L8.41421 18L7 16.5858L4.06109 19.5247L5.4753 20.9389ZM15.2 16H8.41421V18H15.2V16ZM17.908 15.782C17.7516 15.8617 17.5274 15.9266 17.089 15.9624C16.6389 15.9992 16.0566 16 15.2 16V18C16.0236 18 16.7014 18.0008 17.2518 17.9558C17.8139 17.9099 18.3306 17.8113 18.816 17.564L17.908 15.782ZM18.782 14.908C18.5903 15.2843 18.2843 15.5903 17.908 15.782L18.816 17.564C19.5686 17.1805 20.1805 16.5686 20.564 15.816L18.782 14.908ZM19 12.2C19 13.0566 18.9992 13.6389 18.9624 14.089C18.9266 14.5274 18.8617 14.7516 18.782 14.908L20.564 15.816C20.8113 15.3306 20.9099 14.8139 20.9558 14.2518C21.0008 13.7014 21 13.0236 21 12.2H19ZM19 9.8V12.2H21V9.8H19ZM18.782 7.09202C18.8617 7.24842 18.9266 7.47262 18.9624 7.91104C18.9992 8.36113 19 8.94342 19 9.8H21C21 8.97642 21.0008 8.2986 20.9558 7.74817C20.9099 7.18608 20.8113 6.66937 20.564 6.18404L18.782 7.09202ZM17.908 6.21799C18.2843 6.40973 18.5903 6.71569 18.782 7.09202L20.564 6.18404C20.1805 5.43139 19.5686 4.81947 18.816 4.43597L17.908 6.21799ZM15.2 6C16.0566 6 16.6389 6.00078 17.089 6.03755C17.5274 6.07337 17.7516 6.1383 17.908 6.21799L18.816 4.43597C18.3306 4.18868 17.8139 4.09012 17.2518 4.04419C16.7014 3.99922 16.0236 4 15.2 4V6ZM8.8 6H15.2V4H8.8V6ZM6.09202 6.21799C6.24842 6.1383 6.47262 6.07337 6.91104 6.03755C7.36113 6.00078 7.94342 6 8.8 6V4C7.97642 4 7.2986 3.99922 6.74817 4.04419C6.18608 4.09012 5.66937 4.18868 5.18404 4.43597L6.09202 6.21799ZM5.21799 7.09202C5.40973 6.71569 5.71569 6.40973 6.09202 6.21799L5.18404 4.43597C4.43139 4.81947 3.81947 5.43139 3.43597 6.18404L5.21799 7.09202ZM8.41421 18V16C7.88378 16 7.37507 16.2107 7 16.5858L8.41421 18Z"
            />
          </svg>
        ),
        type: "sub",
        selected: false,
        active: false,
        children: [
          {
            path: "/management/feedback/reported",
            type: "link",
            active: false,
            selected: false,
            title: "Feedback bị báo cáo",
          },
          {
            path: "/management/feedback/all",
            type: "link",
            active: false,
            selected: false,
            title: "Danh sách feedback",
          },
        ],
      },
      {
        title: "Quản lý danh mục",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="side-menu__icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M22 7.999a1 1 0 0 0-.516-.874l-9.022-5a1.003 1.003 0 0 0-.968 0l-8.978 4.96a1 1 0 0 0-.003 1.748l9.022 5.04a.995.995 0 0 0 .973.001l8.978-5A1 1 0 0 0 22 7.999zm-9.977 3.855L5.06 7.965l6.917-3.822 6.964 3.859-6.918 3.852z" />
            <path d="M20.515 11.126 12 15.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z" />
            <path d="M20.515 15.126 12 19.856l-8.515-4.73-.971 1.748 9 5a1 1 0 0 0 .971 0l9-5-.97-1.748z" />
          </svg>
        ),
        type: "sub",
        selected: false,
        bookmark: true,
        active: false,
        children: [
          {
            path: "/management/room-category",
            type: "link",
            active: false,
            selected: false,
            title: "Loại phòng",
          },
          {
            path: "/management/service-category",
            type: "link",
            active: false,
            selected: false,
            title: "Loại dịch vụ",
          },
          {
            path: "/management/tags",
            type: "link",
            active: false,
            selected: false,
            title: "Thẻ mô tả",
          },
        ],
      },
    ],
  },
];

export default MENUITEMS;