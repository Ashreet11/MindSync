import Journal from "../models/journal.js";

export const createJournalEntry = async (req,res) => {
  try {
    const { content, prompt } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Please fill the content"});
    }

    const journal = await Journal.create({
      user: req.user._id,
      content,
      prompt: prompt || "",
    });

    res.status(201).json(journal);
  } catch(err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getJournalEntries = async (req,res) => {
  try {
    const journals = await Journal.find({ user: req.user._id }).sort({ date: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Server error "});
  }
};

export const deleteJournalEntry = async (req,res) => {
  try{
    const journal = await Journal.findById(req.params.id);

    if(!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if (journal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorised "});
    }

    await journal.deleteOne();
    res.json({ message: "Journal entry deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error "});
  }
};

export const updateJournalEntry = async (req,res) => {
  try {
    const { content, prompt } = req.body;
    const journal = await Journal.findById(req.params.id);

    if(!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    if(journal.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorised" });
    }

    journal.content = content || journal.content;
    journal.prompt = prompt !== undefined ? prompt : journal.prompt;

    const updatedJournal = await journal.save();
    res.json(updatedJournal);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
