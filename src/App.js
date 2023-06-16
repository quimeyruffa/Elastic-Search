// Paso n.º 1: Importar expresiones
import React from "react";
import { SearchProvider, Results, SearchBox } from "@elastic/react-search-ui";
import { Layout } from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { configurationOptions } from "./configurationOptions";
import {
  PagingInfo,
  ResultsPerPage,
  Paging,
  Facet,
  Sorting,
} from "@elastic/react-search-ui";

// Paso n.º 4: SearchProvider: los toques finales
export default function App() {
  return (
    <SearchProvider config={configurationOptions}>
      <div className="App">
        <Layout
          header={<SearchBox autocompleteSuggestions={true} />}
          bodyContent={<Results titleField="name" urlField="image_url" />}
          sideContent={
            <div>
              <Sorting
                label={"Sort by"}
                sortOptions={[
                  {
                    name: "Relevance",
                    value: "",
                    direction: "",
                  },
                  {
                    name: "Name",
                    value: "name",
                    direction: "asc",
                  },
                ]}
              />
              <Facet field="user_score" label="User Score" />
              <Facet field="critic_score" label="Critic Score" />
              <Facet field="genre" label="Genre" />
              <Facet field="publisher" label="Publisher" isFilterable={true} />
              <Facet field="platform" label="Platform" />
            </div>
          }
          bodyHeader={
            <>
              <PagingInfo />
              <ResultsPerPage />
            </>
          }
          bodyFooter={<Paging />}
        />
      </div>
    </SearchProvider>
  );
}
