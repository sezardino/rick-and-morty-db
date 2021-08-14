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
