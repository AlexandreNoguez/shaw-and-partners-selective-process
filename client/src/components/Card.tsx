import Image from "next/image"

interface CardData<T> {
  [key: string]: T;
}

export const Card = ({ data }: { data: CardData<any> }) => {
  return (
    <div className="border border-white p-4 overflow-hidden bg-slate-800 max-w-xs max-h-fit flex flex-col  flex-wrap">
      {/* <p>{data.name}</p>
      <Image
        src={data.imgURL}
        alt="product image"
        width={100}
        height={100}
      /> */}
      {Object.keys(data).map((key) => {
        const value = data[key];
        return (
          <div key={key}>
            {key.includes("img") ? (
              <Image
                className="mx-auto m-8 rounded-2xl"
                src={value}
                alt="product image"
                width={100}
                height={100}
              />
            ) : null}
            <p className="break-all">
              <span className="font-bold">{key}:</span> {value}
            </p>
          </div>
        );
      })}
    </div>
  )
}