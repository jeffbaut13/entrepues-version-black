import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import "./datepicker.css";

const PasoFecha = ({ selectedDate, setSelectedDate }) => {
  // Validar que selectedDate sea una fecha válida
  let validDate = new Date();

  if (selectedDate instanceof Date && !isNaN(selectedDate)) {
    validDate = selectedDate;
  } else if (typeof selectedDate === "string" && selectedDate) {
    const parsed = new Date(selectedDate);
    if (!isNaN(parsed)) {
      validDate = parsed;
    }
  }

  return (
    <>
      {/*       <div className="text-sm text-center mb-4">
        {selectedDate
          ? format(selectedDate, "EEEE d 'de' MMMM yyyy", { locale: es })
          : "Seleccione una fecha"}
      </div>
 */}

      <DatePicker
        selected={validDate}
        onChange={(date) => setSelectedDate(date)}
        inline
        locale={es}
        minDate={new Date()}
        calendarStartDay={1}
        calendarClassName="!border-none !shadow-none w-full"
      />
    </>
  );
};

export default PasoFecha;
