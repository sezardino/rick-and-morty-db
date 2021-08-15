export const countQuery = `
  query {
    characters {
      info {
        count
      }
    }
  }
`;

export const pageQuery = (page: number) => `
  query {
    characters(page: ${page}) {
      results {
        name
        id
        image
        gender
        species
        episode {
          episode
        }
      }
    }
  }
`;

export const searchCountQuery = (query: string) => `
query {
  characters(filter: {name: "${query}"}) {
    info {
      count
    }
  }
}
`;

export const searchQuery = (query: string, page: number) => `
  query {
    characters(filter: {name: "${query}"} page: ${page} ) {
      results {
        name
          id
          image
          gender
          species
          episode {
            episode
          }
      }
    }
  }
`;
