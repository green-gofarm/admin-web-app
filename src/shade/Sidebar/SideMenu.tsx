export const MENUITEMS = [
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
            path: "/management/account/admin",
            type: "link",
            active: false,
            selected: false,
            title: "Quản trị viên",
          },
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
            <path d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 0 0 .707-1.707l-9-9a.999.999 0 0 0-1.414 0l-9 9A1 1 0 0 0 3 13zm7 7v-5h4v5h-4zm2-15.586 6 6V15l.001 5H16v-5c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v5H6v-9.586l6-6z" />
          </svg>
        ),
      },
      {
        path: "/management/order",
        title: "Đơn đặt tour",
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
            <path d="M19.937 8.68c-.011-.032-.02-.063-.033-.094a.997.997 0 0 0-.196-.293l-6-6a.997.997 0 0 0-.293-.196c-.03-.014-.062-.022-.094-.033a.991.991 0 0 0-.259-.051C13.04 2.011 13.021 2 13 2H6c-1.103 0-2 .897-2 2v16c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V9c0-.021-.011-.04-.013-.062a.99.99 0 0 0-.05-.258zM16.586 8H14V5.414L16.586 8zM6 20V4h6v5a1 1 0 0 0 1 1h5l.002 10H6z" />
          </svg>
        ),
      },
      {
        path: "/management/withdrawal-request",
        title: "Yêu cầu thanh toán",
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
            <path d="M2 17.0601H12" strokeWidth="1.5" strokeMiterlimit="10"
              strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M4.21997 13.5H9.78003C11.56 13.5 12 13.94 12 15.7V19.81C12 21.57 11.56 22.01 9.78003 22.01H4.21997C2.43997 22.01 2 21.57 2 19.81V15.7C2 13.94 2.43997 13.5 4.21997 13.5Z"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round" />
            <path
              d="M18.5 11C20.9853 11 23 8.98528 23 6.5C23 4.01472 20.9853 2 18.5 2C16.0147 2 14 4.01472 14 6.5C14 8.98528 16.0147 11 18.5 11Z"
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ),
      },
      {
        path: "/management/feedback",
        title: "Phản hồi",
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
            <path
              d="M4.32698 6.63803L5.21799 7.09202L4.32698 6.63803ZM4.7682 20.2318L4.06109 19.5247H4.06109L4.7682 20.2318ZM18.362 16.673L18.816 17.564L18.816 17.564L18.362 16.673ZM19.673 15.362L20.564 15.816L20.564 15.816L19.673 15.362ZM19.673 6.63803L20.564 6.18404L20.564 6.18404L19.673 6.63803ZM18.362 5.32698L18.816 4.43597L18.816 4.43597L18.362 5.32698ZM5.63803 5.32698L6.09202 6.21799L5.63803 5.32698ZM7.70711 17.2929L7 16.5858L7.70711 17.2929ZM5 9.8C5 8.94342 5.00078 8.36113 5.03755 7.91104C5.07337 7.47262 5.1383 7.24842 5.21799 7.09202L3.43597 6.18404C3.18868 6.66937 3.09012 7.18608 3.04419 7.74817C2.99922 8.2986 3 8.97642 3 9.8H5ZM5 12V9.8H3V12H5ZM3 12V17H5V12H3ZM3 17V19.9136H5V17H3ZM3 19.9136C3 21.2054 4.56185 21.8524 5.4753 20.9389L4.06109 19.5247C4.40757 19.1782 5 19.4236 5 19.9136H3ZM5.4753 20.9389L8.41421 18L7 16.5858L4.06109 19.5247L5.4753 20.9389ZM15.2 16H8.41421V18H15.2V16ZM17.908 15.782C17.7516 15.8617 17.5274 15.9266 17.089 15.9624C16.6389 15.9992 16.0566 16 15.2 16V18C16.0236 18 16.7014 18.0008 17.2518 17.9558C17.8139 17.9099 18.3306 17.8113 18.816 17.564L17.908 15.782ZM18.782 14.908C18.5903 15.2843 18.2843 15.5903 17.908 15.782L18.816 17.564C19.5686 17.1805 20.1805 16.5686 20.564 15.816L18.782 14.908ZM19 12.2C19 13.0566 18.9992 13.6389 18.9624 14.089C18.9266 14.5274 18.8617 14.7516 18.782 14.908L20.564 15.816C20.8113 15.3306 20.9099 14.8139 20.9558 14.2518C21.0008 13.7014 21 13.0236 21 12.2H19ZM19 9.8V12.2H21V9.8H19ZM18.782 7.09202C18.8617 7.24842 18.9266 7.47262 18.9624 7.91104C18.9992 8.36113 19 8.94342 19 9.8H21C21 8.97642 21.0008 8.2986 20.9558 7.74817C20.9099 7.18608 20.8113 6.66937 20.564 6.18404L18.782 7.09202ZM17.908 6.21799C18.2843 6.40973 18.5903 6.71569 18.782 7.09202L20.564 6.18404C20.1805 5.43139 19.5686 4.81947 18.816 4.43597L17.908 6.21799ZM15.2 6C16.0566 6 16.6389 6.00078 17.089 6.03755C17.5274 6.07337 17.7516 6.1383 17.908 6.21799L18.816 4.43597C18.3306 4.18868 17.8139 4.09012 17.2518 4.04419C16.7014 3.99922 16.0236 4 15.2 4V6ZM8.8 6H15.2V4H8.8V6ZM6.09202 6.21799C6.24842 6.1383 6.47262 6.07337 6.91104 6.03755C7.36113 6.00078 7.94342 6 8.8 6V4C7.97642 4 7.2986 3.99922 6.74817 4.04419C6.18608 4.09012 5.66937 4.18868 5.18404 4.43597L6.09202 6.21799ZM5.21799 7.09202C5.40973 6.71569 5.71569 6.40973 6.09202 6.21799L5.18404 4.43597C4.43139 4.81947 3.81947 5.43139 3.43597 6.18404L5.21799 7.09202ZM8.41421 18V16C7.88378 16 7.37507 16.2107 7 16.5858L8.41421 18Z"
            />
          </svg>
        ),
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
