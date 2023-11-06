import { convertISOToNaturalFormat } from "../../../../../../../helpers/dateUtils"
import CustomizedCard from "../../../../../../General/Card/CustomizedCard"

interface BasicInfoProps {
    user: any,
}

function BasicInfo({
    user,
}: BasicInfoProps) {

    return (
        <>
            <CustomizedCard
                title="Thông tin cơ bản"
                content={
                    <div className="media-list">
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Họ và tên :</label>{" "}
                                    <span className="tx-medium">{user?.name}</span>
                                </div>
                                <div>
                                    <label>Ngày sinh :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.dateOfBirth
                                            ? convertISOToNaturalFormat(user?.dateOfBirth)
                                            : "-"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <div className="media-body">
                                <div>
                                    <label>Họ :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.lastName ?? "-"}
                                    </span>
                                </div>
                                <div>
                                    <label>Tên :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.firstName ?? "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <div className="media-body">
                                <div>
                                    <label>Số điện thoại :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.phoneNumber ?? "-"}
                                    </span>
                                </div>
                                <div>
                                    <label>Email :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.email ?? "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <div className="media-body">
                                <div>
                                    <label>Địa chỉ :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.phoneNumber ?? "-"}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Ngày tạo :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.createdDate
                                            ? convertISOToNaturalFormat(user.createdDate)
                                            : "-"
                                        }
                                    </span>
                                </div>
                                <div>
                                    <label>Lần cập nhật cuối :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.updatedDate
                                            ? convertISOToNaturalFormat(user.updatedDate)
                                            : "-"
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            />
        </>
    )
}

export default BasicInfo