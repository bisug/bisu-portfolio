import { designs } from "@/data/content/designs";

function Designs() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-start">
      {designs.map((item) => {
        return (
          <div className="w-full" key={item.link}>
            <a href={item.link} target="_blank" className="w-full" rel="noopener">
              <img
                className="w-full h-96 hover:opacity-75 transition-opacity object-cover"
                src={item.img}
                alt={item.label}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

export default Designs;
