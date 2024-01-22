const supabase = require("../connection/db");
const validateHome = require("../helpers/validateHome");

async function getHomeDetails() {
  try {
    const { data, error } = await supabase.from("home_details").select("*");
    return { data, error };
  } catch (error) {
    throw error;
  }
}

async function getHomeById(id) {
  try {
    const { data, error } = await supabase
      .from("home_details")
      .select("*")
      .eq("id", id);

    return { data, error };
  } catch (error) {
    throw error;
  }
}

async function createHomeDetails(
  videoBgHomePath,
  { urlTrailerHome, episode, act }
) {
  try {
    const { data, error } = await supabase.from("home_details").insert([
      {
        video_background_home: videoBgHomePath,
        episode,
        url_trailer_home: urlTrailerHome,
        act,
      },
    ]);

    return { data, error };
  } catch (error) {
    throw error;
  }
}

async function deleteHomeDetails(id) {
  try {
    const { error } = await supabase.from("home_details").delete().eq("id", id);
    return { error };
  } catch (error) {
    throw error;
  }
}

async function updateHomeDetails(
  id,
  videoBgHomePath,
  { urlTrailerHome, episode, act }
) {
  try {
    const { data, error } = await supabase
      .from("home_details")
      .update({
        video_background_home: videoBgHomePath,
        episode,
        url_trailer_home: urlTrailerHome,
        act,
      })
      .eq("id", id);

    return { data, error };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getHomeDetails,
  getHomeById,
  createHomeDetails,
  deleteHomeDetails,
  updateHomeDetails,
};
