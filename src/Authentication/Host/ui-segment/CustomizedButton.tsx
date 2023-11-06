
function CustomizedButton({ visible, ...props }: any) {
    return (

        <button
            className={visible ? "btn btn-primary " : "invisible"}
            {...props}
        />

    );
}

export default CustomizedButton;