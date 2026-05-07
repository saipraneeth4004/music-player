const musicModel = require("../models/music.model");
const { uploadFile } = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");

/**
 * Creates a new music track and uploads the audio file to storage.
 * @route POST /music
 * @access Private (authenticated users only)
 */
async function createMusic(req, res) {
  const file = req.file;

  // Ensure a file was included in the request
  if (!file) {
    return res.status(400).json({ message: "File not uploaded properly" });
  }

  const { title } = req.body;

  // Upload the file buffer (as base64) to the storage service
  const result = await uploadFile(file.buffer.toString("base64"));

  // Save the music record to the database with the returned URL
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id, // Artist is derived from the authenticated user
  });

  res.status(201).json({ message: "Music created successfully", music });
}

/**
 * Creates a new album with a list of music track references.
 * @route POST /album
 * @access Private (authenticated users only)
 */
async function createAlbum(req, res) {
  const { title, musics } = req.body;

  // Create the album record linked to the authenticated artist
  const album = await albumModel.create({
    title,
    musics: musics, // Array of music IDs to associate with this album
    artist: req.user.id,
  });

  res.status(201).json({ message: "Album created successfully", album });
}

/**
 * Retrieves all music tracks with populated artist details.
 * @route GET /music
 * @access Public
 */
async function getAllMusics(req, res) {
  // Populate artist field with only username and email
  const musics = await musicModel
    .find()
    .populate("artist", "username email");

  res.status(200).json({ message: "Musics fetched successfully", musics });
}

/**
 * Retrieves all albums with basic info and populated artist details.
 * @route GET /album
 * @access Public
 */
async function getAllAlbums(req, res) {
  // Select only title and artist fields, then populate artist info
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  res.status(200).json({ message: "Albums fetched successfully", albums });
}

/**
 * Retrieves a single album by its ID with full music and artist details.
 * @route GET /album/:albumId
 * @access Public
 */
async function getAlbumById(req, res) {
  const { albumId } = req.params;

  // Populate both artist info and full music track details
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  res.status(200).json({ message: "Album fetched successfully", album });
}

module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
