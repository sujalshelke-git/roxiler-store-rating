interface Props {
  title: string;
  value: number;
}

const Card = ({ title, value }: Props) => {
  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="text-gray-500">
        {title}
      </h2>

      <h1 className="mt-3 text-4xl font-bold">
        {value}
      </h1>

    </div>
  );
};

export default Card;