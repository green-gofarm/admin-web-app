import { FC } from 'react';
import BackDropLoader from './BackDropLoader';

interface WithAuthBackDropLoaderProps {
  open: boolean;
}

const WithAuthBackDropLoader: FC<WithAuthBackDropLoaderProps> = ({
  open,
}) => {
  return (
    <>
      {open ? (
        <BackDropLoader open={open} text="Đang kiểm tra thông tin tài khoản" />
      ) : null}
    </>
  );
};

export default WithAuthBackDropLoader;