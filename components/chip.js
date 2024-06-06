export default function Chip({ children, onClick, checked }) {
    return (
        <div
            className="chip-item"
            onClick={onClick}
            style={{
                backgroundColor: checked ? '#83ad97' : 'white',
                color: checked ? 'white' : 'black',
            }}
        >
            {children}
        </div>
    );
}
