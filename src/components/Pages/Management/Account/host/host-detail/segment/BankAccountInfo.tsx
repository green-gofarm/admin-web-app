import CustomizedCard from "../../../../../../General/Card/CustomizedCard"

interface BankAccountInfoProps {
    user: any,
}

function BankAccountInfo({
    user,
}: BankAccountInfoProps) {

    return (
        <>
            <CustomizedCard
                title="Thông tin tài khoản"
                content={
                    <div className="media-list">
                        <div className="media">
                            <div className="media-body">
                                <div>
                                    <label>Tên ngân hàng :</label>{" "}
                                    <span className="tx-medium">{user?.bankAccountName ?? "-"}</span>
                                </div>
                                <div>
                                    <label>Tài khoản</label>{" "}
                                    <span className="tx-medium">{user?.bankAccountNumber ?? "-"}</span>
                                </div>
                            </div>
                        </div>
                        <div className="media mb-0">
                            <div className="media-body">
                                <div>
                                    <label>Chủ tài khoản</label>{" "}
                                    <span className="tx-medium">
                                        {user?.bankAccountOwner ?? "-"}
                                    </span>
                                </div>
                                <div>
                                    <label>Số điện thoại liên hệ :</label>{" "}
                                    <span className="tx-medium">
                                        {user?.contactInformation ?? "-"}
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

export default BankAccountInfo