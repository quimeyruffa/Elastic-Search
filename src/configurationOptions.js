import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

// Paso n.º 2: El conector
const connector = new AppSearchAPIConnector({
  searchKey: "search-fq5espgsjiy6sxvs9wwj1a4b",
  engineName: "video-games",
  
  hostIdentifier: "quimey.ent.us-central1.gcp.cloud.es.io"
});

// Paso n.º 3: Opciones de configuración
export const configurationOptions = {
    apiConnector: connector,
    autocompleteQuery: {
      suggestions: {
        types: {
          documents: {
            // En qué campos buscar sugerencias
            fields: ["name"]
          }
        },
        // Cuántas sugerencias aparecen
        size: 5
      }
    },
    searchQuery: {
      search_fields: {
        // 1. Busca por nombre de videojuego.
        name: {}
      },
      // 2. Resultados: nombre, género, publicador, puntuaciones y plataforma.
      result_fields: {
        name: {
          // Un fragmento (snippet) significa que los términos de búsqueda que coincidan estarán entre etiquetas <em>.
          snippet: {
            size: 75, // Limita el fragmento a 75 caracteres.
            fallback: true // Retrocede (fallback) a un resultado “sin procesar”.
          }
        },
        genre: {
          snippet: {
            size: 50,
            fallback: true
          }
        },
        publisher: {
          snippet: {
            size: 50,
            fallback: true
          }
        },
        critic_score: {
          // Las puntuaciones son numéricas, por lo que no usaremos un fragmento.
          raw: {}
        },
        user_score: {
          raw: {}
        },
        platform: {
          snippet: {
            size: 50,
            fallback: true
          }
        },
        image_url: {
          raw: {}
        }
      },
      // 3. Faceta por puntuaciones, género, publicador y plataforma, lo usaremos para crear filtros más adelante.
      facets: {
        user_score: {
          type: "range",
          ranges: [
            { from: 0, to: 5, name: "Not good" },
            { from: 5, to: 7, name: "Not bad" },
            { from: 7, to: 9, name: "Pretty good" },
            { from: 9, to: 10, name: "Must play!" }
          ]
        },
        critic_score: {
          type: "range",
          ranges: [
            { from: 0, to: 50, name: "Not good" },
            { from: 50, to: 70, name: "Not bad" },
            { from: 70, to: 90, name: "Pretty good" },
            { from: 90, to: 100, name: "Must play!" }
          ]
        },
        genre: { type: "value", size: 100 },
        publisher: { type: "value", size: 100 },
        platform: { type: "value", size: 100 }
      }
    }
  };