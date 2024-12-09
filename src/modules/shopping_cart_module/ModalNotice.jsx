import React, { forwardRef, useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";

// Sử dụng forwardRef để truyền ref xuống component con
const ModalNotice = forwardRef(
  (
    {
      header,
      content,
      btnAction,
      handleAction,
      handleAddress,
      address,
      errorMessage,
    },
    ref
  ) => {
    const [soNha, setSoNha] = useState("");
    const [duong, setDuong] = useState("");
    const [phuong, setPhuong] = useState("");
    const [quan, setQuan] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
      handleAddress({ soNha, duong, phuong, quan, city });
    }, [soNha, duong, phuong, quan, city]);

    const closeModal = () => {
      if (ref.current) {
        // Kiểm tra xem phần tử có lớp "d-none" hay chưa
        if (ref.current.classList.contains("d-none")) {
          ref.current.classList.remove("d-none");
        } else {
          ref.current.classList.add("d-none");
        }
      }
    };

    return (
      <div className="modal-notice-container d-none" ref={ref}>
        <div
          className="modal-notice-content"
          style={{ position: "relative", width: "50%" }}
        >
          <div className="notice-header row pt-1 mb-2">
            <div
              className="col-10 d-flex align-items-center text-center"
              style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              }}
            >
              <AiOutlineBell />
              &nbsp;&nbsp;<strong>{header}</strong>&nbsp;
            </div>
            <div className="col-2 d-flex align-items-center justify-content-end">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
          </div>
          <div
            className="notice-content d-flex align-items-center justify-content-start"
            style={{
              minHeight: "10vh",
              height: "auto",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              fontSize: "1.2rem",
            }}
          >
            {content}
          </div>
          {header === "Đặt Hàng" ? (
            <>
              <div className="container w-100 mb-1">
                <div className="row mb-2">
                  {/* So nha */}
                  <div className="col input-group input-group-sm mb-2">
                    <span
                      className="input-group-text col-"
                      id="inputGroup-sizing-sm"
                    >
                      Số nhà
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        setSoNha(e.currentTarget.value);
                      }}
                    />
                  </div>
                  {/* Thành phố */}
                  <div className="col input-group input-group-sm mb-2">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Thành Phố
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        setCity(e.currentTarget.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  {/* Dường */}
                  <div className="col input-group input-group-sm mb-2">
                    <span
                      className="input-group-text col-"
                      id="inputGroup-sizing-sm"
                    >
                      Đường
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        setDuong(e.currentTarget.value);
                      }}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  {/* Phường/Xã */}
                  <div className="col input-group input-group-sm mb-2">
                    <span
                      className="input-group-text col-"
                      id="inputGroup-sizing-sm"
                    >
                      Phường/Xã
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        setPhuong(e.currentTarget.value);
                      }}
                    />
                  </div>
                  {/* Quận/Huyện */}
                  <div className="col input-group input-group-sm mb-2">
                    <span
                      className="input-group-text"
                      id="inputGroup-sizing-sm"
                    >
                      Quận/Huyện
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      aria-label="Sizing example input"
                      aria-describedby="inputGroup-sizing-sm"
                      onChange={(e) => {
                        setQuan(e.currentTarget.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              {address === "" ? (
                <p
                  className="w-100 mb-1"
                  style={{ color: "red", textAlign: "start" }}
                >
                  {errorMessage}
                </p>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
          <div
            className="btn-modal modal-footer w-100"
            style={{
              height: "5vh",
            }}
          >
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAction}
            >
              {btnAction}
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default ModalNotice;
