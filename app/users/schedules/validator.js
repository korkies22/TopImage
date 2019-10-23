const { body } = require("express-validator");
exports.validate = method => {
  switch (method) {
    case "schedule": {
      return [
        body("title", "Su horario debe tener un nombre definido")
          .exists()
          .not()
          .isEmpty()
          .withMessage("El formato del título no es válido"),
        body("collegeEvents").custom(events => {
          let errMsg = validateEvents(events);
          if (errMsg) {
            return Promise.reject(errMsg);
          }
          return Promise.resolve("OK");
        })
      ];
    }
  }
};

const validateTime=(event,el)=>{

  if(el.location!==event.location)
    return;

  let eventDates=[new Date(event.startDate),new Date(event.endDate)]
  let elDates=[new Date(el.startDate),new Date(el.endDate)]

  if(eventDates[1]<elDates[0] || eventDates[0]>elDates[1])
    return
    
  if (el.indexStart > event.indexStart && el.indexStart<event.indexEnd) {
    return `El evento con nombre ${el.title} comienza durante el segundo evento con nombre ${event.title}`;
  }
  if (
    el.indexStart <= event.indexStart &&
    el.indexEnd <= event.indexEnd
  ) {
    return `El evento con nombre ${el.title} se intercepta con el evento con nombre ${event.title}`;
  }
}

const validateEvents = events => {
  if (!events) return;
  for (let i = 0; i < events.length; i++) {
    let event = events[i];
    if (event.indexStart > event.indexEnd) {
      return "Las horas de inicio y fin del evento no concuerdan";
    }
    for (let j = i + 1; j < events.length; j++) {
      let el = events[j];

      if(event._id && el._id && event._id===el._id)
        return "Los eventos son idénticos"
        
      el.days.forEach(day => {
        if(event.days.indexOf(day)!=-1)
        {
          let err=validateTime(el,event)
          if(err)
            return err;
        }
      });
      
    }
  }
  return;
};
