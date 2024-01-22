const supabase = require("../connection/db");

async function getAllAgents() {
  try {
    const { data, error } = await supabase.from("agents").select("*");
    return { data, error };
  } catch (error) {
    throw error;
  }
}

async function getAgentById(id) {
  try {
    const { data, error } = await supabase
      .from("agents")
      .select("*")
      .eq("id", id)
      .single();
    return { data, error };
  } catch (error) {
    throw error;
  }
}

async function createAgent(name, abilities) {
  try {
    const { error } = await supabase
      .from("agents")
      .insert([{ name, abilities }])
      .single();
    return { error };
  } catch (error) {
    throw error;
  }
}

async function deleteAgentById(id) {
  try {
    const { error } = await supabase.from("agents").delete().eq("id", id);
    return { error };
  } catch (error) {
    throw error;
  }
}

async function updateAgentById(id, name, abilities) {
  try {
    const { error } = await supabase
      .from("agents")
      .update({ name, abilities })
      .eq("id", id);
    return { error };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllAgents,
  getAgentById,
  createAgent,
  deleteAgentById,
  updateAgentById,
};
