import './style.css'
import { searchArtists } from "./api.js";
import {
  onSearchSubmit,
  showLoading,
  showError,
  showEmpty,
  renderArtists,
} from "./ui.js";

async function handleSearch(term) {
  // 1. Valida se o termo não está vazio
  if (!term) {
    showError("Digite o nome de um artista para buscar.");
    return;
  }

  try {
    // 2. Exibe estado de carregamento
    showLoading();
    
    // 3. Faz a busca na API
    const artists = await searchArtists(term);

    // 4. Exibe os resultados ou mensagem de vazio
    if (artists.length === 0) {
      showEmpty();
    } else {
      renderArtists(artists);
    }
  } catch (error) {
    // 5. Trata erros
    showError("Ocorreu um erro ao buscar os artistas. Tente novamente.");
  }
}

// 6. Liga a função ao evento do formulário
onSearchSubmit(handleSearch);