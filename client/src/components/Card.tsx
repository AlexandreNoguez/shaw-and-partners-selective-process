import Image from "next/image"

interface ServerResponse<T extends Array<any>> {
  [key: string | number]: T[];
}

export const Card = ({ data }: ServerResponse<[]>) => {
  return (
    <div className="border border-white p-4 overflow-hidden bg-slate-800 max-w-xs flex flex-wrap">
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
              <Image className="rounded-2xl" src={value} alt="product image" width={100} height={100} />
            ) : null}
            <p>
              <span className="font-bold">{key}:</span> {value}
            </p>
          </div>
        );
      })}
    </div>
  )
}