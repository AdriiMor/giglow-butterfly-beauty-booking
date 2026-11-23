import mesoterapia from "@/assets/svc-mesoterapia.webp";
import dermapen from "@/assets/svc-dermapen.webp";
import faciales from "@/assets/svc-faciales.webp";
import peptonas from "@/assets/svc-peptonas.webp";
import micropuntura from "@/assets/svc-micropuntura.webp";
import conoterapia from "@/assets/svc-conoterapia.webp";
import copas from "@/assets/svc-copas.webp";
import gimnasia from "@/assets/svc-gimnasia.webp";

export type Service = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  tone: "blush" | "lilac";
  what: string;
  how: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "mesoterapia",
    name: "Mesoterapia",
    tagline: "Microinyecciones de vitaminas y activos",
    image: mesoterapia,
    tone: "blush",
    what: "Es una técnica que aplica microinyecciones de vitaminas, minerales, ácido hialurónico y activos reductores directamente en la capa media de la piel, justo donde más se necesitan.",
    how: "Trabajamos por zonas (rostro, abdomen, piernas o brazos) según tus objetivos, en sesiones cortas y con un plan personalizado.",
    benefits: [
      "Reduce grasa localizada y celulitis",
      "Hidrata y revitaliza la piel",
      "Mejora la circulación",
      "Resultados progresivos sin cirugía",
    ],
  },
  {
    slug: "dermapen",
    name: "Dermapen",
    tagline: "Renovación de piel con microagujas",
    image: dermapen,
    tone: "lilac",
    what: "Es un dispositivo con microagujas que crea microcanales en la piel para estimular la producción natural de colágeno y elastina.",
    how: "Mientras trabajamos, aplicamos sueros que penetran mucho mejor gracias a los microcanales, potenciando sus resultados.",
    benefits: [
      "Atenúa cicatrices de acné y poros abiertos",
      "Unifica el tono y reduce manchas",
      "Mejora textura y firmeza",
      "Aporta luminosidad inmediata",
    ],
  },
  {
    slug: "faciales",
    name: "Faciales",
    tagline: "Básicos y Profundos",
    image: faciales,
    tone: "blush",
    what: "Tratamientos de limpieza y cuidado para que tu piel respire y luzca sana. Contamos con dos versiones: Básico y Profundo.",
    how: "El Básico incluye limpieza, exfoliación, extracción ligera, mascarilla e hidratación. El Profundo suma extracción a fondo, peeling suave y activos específicos para tu tipo de piel.",
    benefits: [
      "Piel limpia y libre de impurezas",
      "Ayuda a prevenir el acné",
      "Hidratación y efecto glow",
      "Un momento de relajación total",
    ],
  },
  {
    slug: "peptonas",
    name: "Peptonas",
    tagline: "Volumen y firmeza en glúteos",
    image: peptonas,
    tone: "lilac",
    what: "Son proteínas que se aplican en la zona de glúteos para estimular la formación de tejido y la tonificación del músculo.",
    how: "Se aplican en sesiones programadas; el volumen y la firmeza aparecen de forma gradual y natural.",
    benefits: [
      "Aumento de volumen gradual y natural",
      "Firmeza",
      "Mejora la forma de la zona",
      "Sin cirugía",
    ],
  },
  {
    slug: "micropuntura-brasilena",
    name: "Micropuntura Brasileña",
    tagline: "Tratamiento para estrías",
    image: micropuntura,
    tone: "blush",
    what: "Técnica que utiliza una aguja muy fina para trabajar directamente sobre la estría, rompiendo la fibrosis y activando la regeneración de la piel.",
    how: "Se combina con activos regenerantes y funciona tanto en estrías blancas como rojas, sesión tras sesión.",
    benefits: [
      "Reduce visiblemente el ancho y color de las estrías",
      "Estimula la producción de colágeno",
      "Mejora la textura de la piel",
      "Resultados duraderos",
    ],
  },
  {
    slug: "conoterapia",
    name: "Conoterapia",
    tagline: "Limpieza y relajación del oído",
    image: conoterapia,
    tone: "lilac",
    what: "Es una técnica ancestral que utiliza conos de tela encerada colocados suavemente en el oído.",
    how: "El calor suave y el efecto de succión ayudan a limpiar el oído mientras te relajas en un ambiente tranquilo.",
    benefits: [
      "Limpieza suave del oído",
      "Alivia la sensación de oído tapado",
      "Aminora dolores de cabeza",
      "Sensación de ligereza",
    ],
  },
  {
    slug: "copas-colombianas",
    name: "Copas Colombianas",
    tagline: "Levantamiento de glúteos",
    image: copas,
    tone: "blush",
    what: "Es un masaje con copas de vacío que succionan y levantan el tejido de la zona de glúteos.",
    how: "Estimula la circulación, el drenaje y la oxigenación del tejido. Es el complemento ideal para las peptonas.",
    benefits: [
      "Efecto levantamiento",
      "Reduce la apariencia de celulitis",
      "Mejora circulación y drenaje",
      "Potencia otros tratamientos corporales",
    ],
  },
  {
    slug: "gimnasia-pasiva",
    name: "Gimnasia Pasiva",
    tagline: "Tonifica sin esfuerzo",
    image: gimnasia,
    tone: "lilac",
    what: "Es electroestimulación: electrodos que generan contracciones musculares, similares a las del ejercicio, mientras tú descansas.",
    how: "Colocamos los electrodos en la zona a trabajar (abdomen, piernas, glúteos o brazos) y ajustamos la intensidad a tu comodidad.",
    benefits: [
      "Tonifica y reafirma",
      "Ayuda a reducir medidas",
      "Mejora la circulación",
      "Ideal como complemento de otros tratamientos",
    ],
  },
];
