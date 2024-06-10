import './PizzaPreview.css';

type PizzaPreviewProps = {
  toppings?: string[];
};

export function PizzaPreview({ toppings }: PizzaPreviewProps) {
  return (
    <div className="relative w-[265px] h-[171px] mx-auto">
      <div className="pizza-viewer scale-[0.5] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="pizza pizza--active">
          <div className="pizza__board"></div>
          <div className="pizza__base"></div>
          <div className="pizza__toppings">
            {toppings?.map((topping) => (
              <div key={topping}>
                <div
                  className={`pizza__topping pizza__topping--${topping}`}
                ></div>
                <div
                  className={`pizza__topping pizza__topping--${topping}`}
                ></div>
                <div
                  className={`pizza__topping pizza__topping--${topping}`}
                ></div>
                <div
                  className={`pizza__topping pizza__topping--${topping}`}
                ></div>
                <div
                  className={`pizza__topping pizza__topping--${topping}`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
