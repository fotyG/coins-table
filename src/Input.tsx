export type InputProps = {
  value: string;
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  return (
    <input
      type="text"
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      className={"border border-white/10 bg-blue-950 p-2 " + props.className}
    />
  );
}
