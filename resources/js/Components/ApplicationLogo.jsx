export default function ApplicationLogo({ className = '', ...props }) {
    return (
        <img
            {...props}
            src="/images/logo.png"
            alt="ExamHall"
            className={className}
        />
    );
}
