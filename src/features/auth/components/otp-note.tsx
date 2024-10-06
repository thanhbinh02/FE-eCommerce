import { OTP_RESEND_DURATION, OTP_VALID_DURATION } from "../constant";
import { useAppLocalStorage } from "@/features/local-storage";
import { convertSecondsToVietnameseTime } from "@/utils";

const OTPNote = () => {
  const { otpResendDuration } = useAppLocalStorage();

  return (
    <>
      {otpResendDuration && (
        <div className="!text-left flex-col-common">
          <span>Ghi chú</span>
          <span>1. Mã OTP chỉ có hiệu lực trong 5 phút</span>
          <span>
            2. Vui lòng đợi{" "}
            {convertSecondsToVietnameseTime(
              otpResendDuration - (OTP_VALID_DURATION - OTP_RESEND_DURATION),
            )}{" "}
            để nhận mã OTP mới
          </span>
        </div>
      )}
    </>
  );
};

export default OTPNote;
