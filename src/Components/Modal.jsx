import { useRef, useImperativeHandle  } from "react";

export function Modal({children , ref}){
    const dialogRef = useRef();
    useImperativeHandle(ref, () => {
            return {
                open() {
                    dialogRef.current.showModal()
                },
                close(){
                    dialogRef.current.close();
                }
            }
        });
    return(
        <dialog className="modal cart" ref={dialogRef}>
            {children}
        </dialog>
    )
}