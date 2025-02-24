import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createBlogPost, updateBlogPost, getBlogPost } from "../../../api/blog";
import './BlogEditor.css';

const BlogEditor = ({ postId = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    thumbnail: null,
    faqs: [],
    meta: {
      title: "",
      description: "",
      keywords: "",
      author: "",
      robots: "index, follow",
    },
    openGraph: {
      title: "",
      description: "",
      image: "",
      siteName: "",
    },
    twitter: {
      card: "summary_large_image",
      title: "",
      description: "",
      image: "",
      site: "",
    },
  });

  const [files, setFiles] = useState({
    thumbnail: null,
    ogImage: null
  });
  
  const [openSections, setOpenSections] = useState({
    basicMeta: false,
    facebookMeta: false,
    twitterMeta: false,
  });

  const quillRef = useRef();

  useEffect(() => {
    const loadPost = async () => {
      if (postId) {
        try {
          const post = await getBlogPost(postId);
          setFormData(post);
        } catch (error) {
          console.error('Error loading post:', error);
          // Handle error (show notification, etc.)
        }
      }
    };
    loadPost();
  }, [postId]);

  const modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
    }));
  };

  const handleInputChange = (e, section) => {
    const { name, value } = e.target;
    
    if (section === "meta" && name === "keywords") {
      const processedValue = value.replace(/\s+/g, ', ').replace(/,\s*,/g, ',');
      
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: processedValue.trim(),
        },
      }));
    } else if (section) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e, section) => {
    const file = e.target.files[0];
    if (file) {
      if (section === 'openGraph') {
        setFiles(prev => ({ ...prev, ogImage: file }));
      }
      
      // For preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [section]: {
            ...prev[section],
            image: reader.result,
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, thumbnail: file }));
      // For preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          thumbnail: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));
  };

  const removeFaq = (index) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleFaqChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      ),
    }));
  };

  const handleSave = async () => {
    try {
      let response;
      if (postId) {
        response = await updateBlogPost(
          postId,
          formData,
          files.thumbnail,
          files.ogImage
        );
      } else {
        response = await createBlogPost(
          formData,
          files.thumbnail,
          files.ogImage
        );
      }
      console.log('Post saved successfully:', response);
      // Handle success (show notification, redirect, etc.)
    } catch (error) {
      console.error('Error saving post:', error);
      // Handle error (show notification, etc.)
    }
  };

  const handlePublish = async () => {
    try {
      // First save the post
      const savedPost = await handleSave();
      // Then toggle publish status
      if (savedPost?._id) {
        // await togglePublishPost(savedPost._id);
        // Handle success (show notification, redirect, etc.)
      }
    } catch (error) {
      console.error('Error publishing post:', error);
      // Handle error (show notification, etc.)
    }
  };

  return (
    <div className="BlogEditorWrapper">
      <div className="BlogEditorContainer">
        <div className="BlogEditorMain WithSidebar">
          <header className="EditorHeader">
            <span className="EditorTitle">Blog - 1</span>
            <div className="HeaderActions">
              <button className="Button ButtonCreate">Create</button>
              <button className="Button">Saved (0)</button>
            </div>
          </header>

          <div className="TitleSection">
            <h3 className="SectionTitle">Title</h3>
            <input
              type="text"
              className="TitleInput"
              placeholder="Bold Heading"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="EditorSection">
            <h3 className="SectionTitle">Describe your content</h3>
            <ReactQuill
              ref={quillRef}
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              className="QuillEditor"
            />
          </div>

          <div className="FaqSection">
            {formData.faqs.map((faq, index) => (
              <div key={index} className="FaqItem">
                <div className="FaqHeader">
                  <span>FAQ #{index + 1}</span>
                  <button
                    className="Button ButtonRemove"
                    onClick={() => removeFaq(index)}
                  >
                    -
                  </button>
                </div>
                <input
                  type="text"
                  className="FaqInput"
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                />
                <textarea
                  className="FaqInput"
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  rows={3}
                />
              </div>
            ))}
            <button className="Button ButtonFaq" onClick={addFaq}>
              ADD FAQ
            </button>
          </div>
        </div>

        <div className="EditorSidebar Open">
          <div className="SidebarHeader5">
            <span className="TextMuted">2024-09-17 Untitled</span>
            <button className="Button">
              <i className="bx bx-dots-horizontal-rounded"></i>
            </button>
          </div>

                    <label className="MetaLabel">Thumbnail</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="MetaInput"
                    />
                  <div className="InputGroup">
                    {formData.thumbnail && (
                      <img 
                        src={formData.thumbnail} 
                        alt="Thumbnail preview" 
                        className="ThumbnailPreview" 
                      />
                    )}
                  </div>
          <div className="MetaSection">
            <div className="MetaGroup">
              <div 
                className="MetaGroupHeader" 
                onClick={() => toggleSection('basicMeta')}
              >
                <h4 className="MetaGroupTitle">Basic Meta Tags</h4>
                {openSections.basicMeta ? 
                  <ChevronUp className="MetaGroupIcon" /> : 
                  <ChevronDown className="MetaGroupIcon" />
                }
              </div>
              {openSections.basicMeta && (
                <div className="MetaGroupContent">
                  <div className="InputGroup">
                    <label className="MetaLabel">Meta Title</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="Your Page Title - Keywords | Brand Name"
                      name="title"
                      value={formData.meta.title}
                      onChange={(e) => handleInputChange(e, "meta")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Meta Description</label>
                    <textarea
                      className="MetaInput"
                      placeholder="A brief description of your page's content (150-160 characters)"
                      name="description"
                      value={formData.meta.description}
                      onChange={(e) => handleInputChange(e, "meta")}
                      rows={3}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Keywords</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="keyword1, keyword2, keyword3"
                      name="keywords"
                      value={formData.meta.keywords}
                      onChange={(e) => handleInputChange(e, "meta")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Author</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="Your Name or Company Name"
                      name="author"
                      value={formData.meta.author}
                      onChange={(e) => handleInputChange(e, "meta")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="MetaGroup">
              <div 
                className="MetaGroupHeader" 
                onClick={() => toggleSection('facebookMeta')}
              >
                <h4 className="MetaGroupTitle">Facebook Meta Tags</h4>
                {openSections.facebookMeta ? 
                  <ChevronUp className="MetaGroupIcon" /> : 
                  <ChevronDown className="MetaGroupIcon" />
                }
              </div>
              {openSections.facebookMeta && (
                <div className="MetaGroupContent">
                  <div className="InputGroup">
                    <label className="MetaLabel">OG Title</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="Open Graph Title"
                      name="title"
                      value={formData.openGraph.title}
                      onChange={(e) => handleInputChange(e, "openGraph")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">OG Description</label>
                    <textarea
                      className="MetaInput"
                      placeholder="Open Graph Description"
                      name="description"
                      value={formData.openGraph.description}
                      onChange={(e) => handleInputChange(e, "openGraph")}
                      rows={3}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">OG Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="MetaInput"
                      onChange={(e) => handleImageUpload(e, "openGraph")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Website Name</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="Your Website Name"
                      name="siteName"
                      value={formData.openGraph.siteName}
                      onChange={(e) => handleInputChange(e, "openGraph")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="MetaGroup">
              <div 
                className="MetaGroupHeader" 
                onClick={() => toggleSection('twitterMeta')}
              >
                <h4 className="MetaGroupTitle">Twitter Card Tags</h4>
                {openSections.twitterMeta ? 
                  <ChevronUp className="MetaGroupIcon" /> : 
                  <ChevronDown className="MetaGroupIcon" />
                }
              </div>
              {openSections.twitterMeta && (
                <div className="MetaGroupContent">
                  <div className="InputGroup">
                    <label className="MetaLabel">Twitter Card Type</label>
                    <select
                      className="MetaInput"
                      name="card"
                      value={formData.twitter.card}
                      onChange={(e) => handleInputChange(e, "twitter")}
                    >
                      <option value="summary">Summary</option>
                      <option value="summary_large_image">
                        Summary Large Image
                      </option>
                      <option value="app">App</option>
                      <option value="player">Player</option>
                    </select>
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Twitter Title</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="Twitter Card Title"name="title"
                      value={formData.twitter.title}
                      onChange={(e) => handleInputChange(e, "twitter")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Twitter Description</label>
                    <textarea
                      className="MetaInput"
                      placeholder="Twitter Card Description"
                      name="description"
                      value={formData.twitter.description}
                      onChange={(e) => handleInputChange(e, "twitter")}
                      rows={3}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Twitter Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      className="MetaInput"
                      onChange={(e) => handleImageUpload(e, "twitter")}
                    />
                  </div>
                  <div className="InputGroup">
                    <label className="MetaLabel">Twitter Handle</label>
                    <input
                      type="text"
                      className="MetaInput"
                      placeholder="@yourtwitterhandle"
                      name="site"
                      value={formData.twitter.site}
                      onChange={(e) => handleInputChange(e, "twitter")}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="SidebarActions">
              <button className="Button ButtonSave" onClick={handleSave}>
                Save
              </button>
              <button className="Button ButtonPublish" onClick={handlePublish}>
                Publish
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;